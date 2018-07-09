<?php

namespace App\Http\Controllers;

use App\Chat;
use App\User;
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

    public function saveChat(Request $request)
    {
        $i    = 1;
        $data = $request->get('data');
        if ($data) {
            $message = $data['message'];
            $time    = $data['time'];
            $user    = User::where('name', $data['user'])->first();

            $chat          = new Chat();
            $chat->message = $message;
            $chat->time    = $time;
            $chat->user()->associate($user);
            $chat->save();
        }
    }
}
