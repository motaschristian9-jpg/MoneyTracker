<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\JwtMiddleware;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        // Register JWT middleware alias
        Route::aliasMiddleware('jwt.auth', JwtMiddleware::class);

        // Load custom routes
        $this->loadRoutesFrom(base_path('routes/routes.php'));
    }
}
