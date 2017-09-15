<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;
use App\Start;
use Illuminate\Support\Facades\DB;
class HomeController extends Controller
{
    
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $starts = Start::orderBy('date', 'desc')->paginate(5);
        return view('home',compact(['starts']));
    }
    public function show($id){
        $start = Start::find($id);
        return view('start',compact(['start']));
    }
}
