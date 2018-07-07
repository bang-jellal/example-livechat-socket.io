<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function index()
    {
        return view('chat');
    }

    public function user(Request $request)
    {
        $user = $request->user();

        return response()->json($user);
    }
}
