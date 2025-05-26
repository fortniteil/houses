<?php

namespace App\Providers;

use Illuminate\Support\Facades\Cache;
use OpenAI\Client;

class OpenAiSeoService
{
    protected Client $openAi;

    public function __construct()
    {
        $this->openAi = new Client(env('OPENAI_API_KEY'));
    }

    public function generateSeo(string $routeName, array $params = []): array
    {
        $cacheKey = 'seo_' . md5($routeName . json_encode($params));

        return Cache::remember($cacheKey, now()->addDays(7), function () use ($routeName, $params) {
            // fallback בסיסי אם OpenAI לא זמין או מחזיר שגיאה
            $fallback = $this->getFallbackSeo($routeName, $params);

            try {
                $prompt = $this->buildPrompt($routeName, $params);

                $response = $this->openAi->chat()->create([
                    'model' => 'gpt-4o-mini', // או דגם אחר לפי חשבון OpenAI שלך
                    'messages' => [
                        ['role' => 'system', 'content' => 'You are a real estate SEO expert.'],
                        ['role' => 'user', 'content' => $prompt],
                    ],
                    'max_tokens' => 150,
                ]);

                $content = $response->choices[0]->message->content ?? '';

                // מצפים לקבל JSON מהתשובה: { "title": "...", "description": "..." }
                $seoData = json_decode($content, true);

                if (json_last_error() === JSON_ERROR_NONE && isset($seoData['title'], $seoData['description'])) {
                    return $seoData;
                }

                // אם לא התקבל JSON תקין - fallback
                return $fallback;
            } catch (\Exception $e) {
                // במקרה של שגיאה כלשהי
                return $fallback;
            }
        });
    }

    protected function getFallbackSeo(string $routeName, array $params): array
    {
        if ($routeName === 'properties.index' && !empty($params['city'])) {
            $city = $params['city'];
            return [
                'title' => "נכסים ב-{$city} | נכסים+",
                'description' => "מצא דירות ונכסים ב-{$city} עם המלצות AI חכמות ומדויקות.",
            ];
        }

        return [
            'title' => "נכסים+ - פורטל הנדל\"ן המוביל בישראל",
            'description' => "גלה נכסים מכל הארץ עם התאמה אישית וניתוח מתקדם מבוסס AI.",
        ];
    }

    protected function buildPrompt(string $routeName, array $params): string
    {
        if ($routeName === 'properties.index' && !empty($params['city'])) {
            return "Generate a SEO title and description in Hebrew for a real estate listing page filtered by city '{$params['city']}'. Respond ONLY with a JSON object with keys 'title' and 'description'.";
        }

        return "Generate a general SEO title and description in Hebrew for a real estate website homepage. Respond ONLY with a JSON object with keys 'title' and 'description'.";
    }
}
