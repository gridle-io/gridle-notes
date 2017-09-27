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
        ///print_r("inside store");
        //var_dump('storeMethod');die;
        
        $requestData = $request->all();
        
        
        //print_r("store after json_encode requestData");
        $note = Note::create($requestData); //requestData is an array???
        //return json_encode($requestData);
      //print_r("store after note::create ");
        if ($requestData["is_checklist"]==1) {

                $note = Note::find($note->id); //what does find($note->id) do? why not simply use $note_id or $id instead of $note->id??
                // $checkbox = ["label"=>"ssdsd"];

               foreach ($requestData["checklist"] as $checkbox) { //see php foreach explanation $checkbox is $value which we require from the array of $requestData
                               
                $note->checklist()->save(
                    new checklist(["label"=>$checkbox["label"],"is_checked"=>$checkbox["is_checked"]]) // an object is created here
                );
            }

        }
        //return $note; //remove
        // print_r("store after if condition");
        $queryResult = Note::find($note->id)->with('checklist')->get(); // CORRECT THIS USING JOIN
        // print_r("store after queryResult");
        // $queryResult= DB::table('notes')
        // ->join('checklist','id') 

        // return data response to the frond-end
        //return $queryResult;
        // $arrayName = array(
        //     'note_id'=>$note->id,
        //     'title'=>$note->title,
        //     'data'=>$note->data,                        //why create this array
        //     'is_checklist'=>$note->is_checklist,
        //     'checklist'=>[],
        //     'updated_at'=>$note->updated_at,
        //     'created_at'=>$note->created_at
        // );
       return response()->json($queryResult, 201); 
       return json_encode($requestData);
       //print_r("store after response");      
       /*why simply $requestData cant be returned 
       to the database?? = we need checklist table for corresponding note_id.
       
       JSON Responses
The json method will automatically set the Content-Type header to application/json, as well as convert the given array to JSON using the json_encode PHP function*/

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
