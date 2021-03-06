<?php
namespace App\Http\Controllers;
use App\Note;
use App\User;
use App\Checklist;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    public function index(Request $request,$user_id)
    {  
        // return json_encode($request);
        // return json_encode($request->all());
        
        return Note::where("user_id",$user_id)->with('checklist')->get();
    }

    public function store(Request $request,$user_id)
    {
        $checklists = [];
        $requestData = $request->all();
        
        $user = User::find($user_id);

        $note = $user->notes()->create($requestData); 
        

        if ($requestData["is_checklist"]==1) {


            foreach ($requestData["checklist"] as $checkbox) {
                $newChecklist = new Checklist(["label"=>$checkbox["label"],"is_checked"=>$checkbox["is_checked"]]) ;           
                array_push($checklists, $newChecklist);
                $note->checklist()->save($newChecklist);
            }
        } 
        $note->checklist = $checklists;
        $response = $note;
        
       return response()->json($response, 201); 
    
    }
    public function update(Request $request,$id)
    {
        $checklists = [];
        $updates=$request->all();
        $note= Note::find($id);       
        $note->data= $updates["data"];
        $note->title=$updates["title"];

        if ($updates["is_checklist"]==1) {
            foreach ($updates["checklist"] as $checkbox) {
                   $checklist = Checklist::find($checkbox["id"]);
                   $checklist->label=$checkbox["label"];
                   $checklist->is_checked=$checkbox["is_checked"];
                   $checklist->save();
                   
            }
        }
        $note->save();
        

        return response()->json($note,200);
        
    }

    public function delete(Request $request,$id)
    {
       
        $note = Note::find($id)->delete();
        
        return response()->json("deleletd", 204);
    }
}
