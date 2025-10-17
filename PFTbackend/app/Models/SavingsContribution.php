<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SavingsContribution extends Model
{
    use HasFactory;

    protected $fillable = [
        'savings_id',
        'amount',
        'description',
    ];

    public function savings()
    {
        return $this->belongsTo(Savings::class);
    }
}
