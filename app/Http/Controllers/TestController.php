<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TestController extends Controller
{
    public function __invoke()
    {
        var_dump(111);
    }
}
