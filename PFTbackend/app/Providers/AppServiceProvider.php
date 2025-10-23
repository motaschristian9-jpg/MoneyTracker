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
        // Register middleware aliases
        Route::aliasMiddleware('jwt.auth', JwtMiddleware::class);
        Route::aliasMiddleware('cors', CorsMiddleware::class);

        // Load custom routes
        $this->loadRoutesFrom(base_path('routes/routes.php'));
    }
}
