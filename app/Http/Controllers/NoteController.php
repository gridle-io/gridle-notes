<?php
namespace App\Http\Controllers;
use App\Note;
use App\checklist;

use Illuminate\Http\Request;

class NoteController extends Controller
{
    public function index()
    {

        return Note::with('checklist')->get();
    }

    public function show(Note $note)
    {   
        return $note;
    }

    public function store(Request $request)
    {

        
        $requestData = $request->all();

        
        $note = Note::create($requestData);
      
        if ($requestData["is_checklist"]==1) {

                $note = Note::find($note->id);
                // $checkbox = ["label"=>"ssdsd"];

               foreach ($requestData["checklist"] as $checkbox) {
                               
                $note->checklist()->save(
                    new checklist(["label"=>$checkbox["label"],"is_checked"=>$checkbox["is_checked"]])
                );
            }

        }
        
        $queryResult = Note::find($note->id)->with('checklist')->get();
        // return data respond to the frond-end
        return $queryResult;
        $arrayName = array(
            'note_id'=>$note->id,
            'title'=>$note->title,
            'data'=>$note->data,
            'is_checklist'=>$note->is_checklist,
            'checklist'=>[],
            'updated_at'=>$note->updated_at,
            'created_at'=>$note->created_at
        );
     
       return response()->json($arrayName, 201);

    }

    public function update(Request $request, Note $note)
    {
        $note->update($request->all());

        return response()->json($note, 200);
    }

    public function delete(Request $request,$id)
    {
       
        $note = Note:: where('note_id',$id)->delete();
        return response()->json("deleletd", 204);
    }
}
