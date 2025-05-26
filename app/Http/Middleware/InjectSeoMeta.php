<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Providers\OpenAiSeoService;

class InjectSeoMeta
{
    public function handle(Request $request, Closure $next)
    {
        $route = $request->route();

        if ($route && $route->getName()) {
            $routeName = $route->getName();
            $params = $route->parameters();

            $seo = app(OpenAiSeoService::class)->generate($routeName, $params);
            Inertia::share('seo', $seo);
        }

        return $next($request);
    }
}
