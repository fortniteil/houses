<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Request;
use App\Models\VisitorInteraction;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use Torann\GeoIP\Facades\GeoIP;
use Illuminate\Support\Str;

class TrackingController extends Controller
{
    /**
     * Store a visitor interaction log.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $visitorId = $request->input('visitorId');
        $location = $request->input('pathname') ?? 'unknown';
        $ip = $request->ip();
        $userAgent = $request->header('User-Agent');

        // 🧠 Parse extra fields
        $screenWidth = $request->input('screenWidth');
        $screenHeight = $request->input('screenHeight');
        $referrer = $request->input('referrer') ?? null;

        // 🔍 GeoIP attempt
        try {
            $geo = GeoIP::get($ip);
        } catch (\Exception $e) {
            $geo = (object)[
                'city' => 'Unknown',
                'country' => 'Unknown',
                'state' => 'Unknown',
            ];
        }

        // 🎯 Detect device type
        $device = Str::contains(strtolower($userAgent), ['mobile', 'android', 'iphone']) ? 'mobile' : 'desktop';

        // 🔁 Avoid duplicate within short window (e.g., 5 minutes)
        $existing = DB::table('visitor_interactions')
            ->where('visitor_id', $visitorId)
            ->where('location', $location)
            ->where('ip_address', $ip)
            ->where('created_at', '>=', now()->subMinutes(5))
            ->first();

        if ($existing) {
            DB::table('visitor_interactions')->where('id', $existing->id)->update([
                'updated_at' => now(),
                'count' => DB::raw('count + 1'),
            ]);

            return response()->json(['log_id' => $existing->id, 'updated' => true]);
        }

        // 📝 Create new log
        $id = DB::table('visitor_interactions')->insertGetId([
            'visitor_id' => $visitorId,
            'action' => 'visit',
            'data' => json_encode([
                'screen' => "{$screenWidth}x{$screenHeight}",
                'referrer' => $referrer,
                'city' => $geo->city,
                'region' => $geo->state,
                'country' => $geo->country,
                'device' => $device,
                'utm' => [
                    'source' => $request->query('utm_source'),
                    'medium' => $request->query('utm_medium'),
                    'campaign' => $request->query('utm_campaign'),
                ],
            ]),
            'ip_address' => $ip,
            'user_agent' => $userAgent,
            'location' => $location,
            'count' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json(['log_id' => $id, 'created' => true]);
    }
}
