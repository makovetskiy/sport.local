<?php

namespace App\Http\Controllers;
use App\Start;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;

class StartsController extends Controller
{
    public function index()
    {
        $starts = Start::latest()->paginate(5);
        $response = [
            'pagination' => [
                'total' => $starts->total(),
                'per_page' => $starts->perPage(),
                'current_page' => $starts->currentPage(),
                'last_page' => $starts->lastPage(),
                'from' => $starts->firstItem(),
                'to' => $starts->lastItem()
            ],
            'data' => $starts
        ];
        return response()->json($response);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'title' => 'required|unique:starts,title,'.$id,
            'description' => 'required',
            'date' =>'unique:starts,date,'.$id
        ]);
        $edit = Start::find($id)->update($request->all());
        return response()->json($edit);
    }
    public function store(Request $request)
    {
        
        $this->validate($request, [
            'title' => 'required|unique:starts',
            'description' => 'required',
            'date' =>'unique:starts'
        ]);
        $create = new Start;
        $create->title = $request->input('title');
        $create->description = $request->input('description');
        $create->date = $request->input('date');
        $create->time = $request->input('time');
        $create->photo = $request->input('photo');
        $create->save();

        return response()->json($create);
    }
    public function destroy($id)
    {
        Start::find($id)->delete();
        return response()->json(['done']);
    }
}
