<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\JwtMiddleware;
use App\Http\Middleware\CorsMiddleware;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        // JWT alias
        Route::aliasMiddleware('jwt.auth', JwtMiddleware::class);

        // Apply CORS middleware globally to all API routes
        Route::middleware([CorsMiddleware::class])
            ->prefix('api')
            ->group(base_path('routes/routes.php'));
    }
}
