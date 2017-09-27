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

        $checklists = [];
        $requestData = $request->all();
        // return $requestData;
        
        $note = Note::create($requestData); 
        if ($requestData["is_checklist"]==1) {

                // $note = Note::find($note->id); 
            foreach ($requestData["checklist"] as $checkbox) {
                $newChecklist = new checklist(["label"=>$checkbox["label"],"is_checked"=>$checkbox["is_checked"]]) ;           
                array_push($checklists, $newChecklist);
                $note->checklist()->save(
                    $newChecklist
                );
            }
        }
        // return $note;
        // $/queryResult = Note::find($note->id)->with('checklist')->get(); 
        $note->checklist = $checklists;
        $response = $note;
        
       return response()->json($response, 201); 
    
    }
   // public function edit($request, $id)
   //  {
   //      //var_dump('hiexpression');die();
   //      $requestData = $request->all();
   //      return json_encode($requestData);
   //      //print_r("store after json_encode requestData");
   //      $note = Note::create($requestData); //requestData is an array???
   //    //print_r("store after note::create ");
   //      if ($requestData["is_checklist"]==1) {

   //              $note = Note::find($note->id); //what does find($note->id) do? why not simply use $note_id or $id instead of $note->id??
   //              // $checkbox = ["label"=>"ssdsd"];

   //             foreach ($requestData["checklist"] as $checkbox) { //see php foreach explanation $checkbox is $value which we require from the array of $requestData
                               
   //              $note->checklist()->save(
   //                  new checklist(["label"=>$checkbox["label"],"is_checked"=>$checkbox["is_checked"]]) // an object is created here
   //              );
   //          }

   //      }
   //      // print_r("store after if condition");
   //      $queryResult = Note::find($note->id)->with('checklist')->get(); // CORRECT THIS USING JOIN
        
   //     return response()->json($queryResult, 201);  

   //  }

    public function update(Request $request, Note $note)
    {
       // dd($this->route('note'));die;
        //var_dump('insideUpdateMethod');die;
       //print_r("inside update");
       $note= Note::find($note->id);
            /*DB::table('notes')
                ->where('id', $id)
                ->update(['title' =>$request['title'],
                'data'=>$request['data']]);*/
                
                // $this-> validate($request,[
                //     'body'=>'required',
                //     'title'=>'required|unique:notes',
                // ]);
                $note->data= $request->body;
                $note->title=$request->title;
                $note->save();
                return json_encode($note);
                // return $note;
               // return response()->json($note,200);

    }

    public function delete(Request $request,$id)
    {
        //print_r("inside delete");
       //var_dump($request);die;
        $note = Note::where('id',$id)->delete();
        return response()->json("deleletd", 204);
    }
}
