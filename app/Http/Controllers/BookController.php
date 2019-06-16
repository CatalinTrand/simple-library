<?php

namespace App\Http\Controllers;

use App\Author;
use App\Book;
use App\Tag;
use Illuminate\Http\Request;
use Intervention\Image\ImageManagerStatic as Image;

class BookController extends Controller
{
    public function index(){
        $books = Book::all();
        foreach ($books as $book)
            $book->author_name = Author::find($book->author_id)->name;

        return response()->json($books,200);
    }

    public function allAuthors(){
        $authors = Author::all();
        return response()->json($authors,200);
    }

    public function allTags(){
        $tags = Tag::all();
        return response()->json($tags,200);
    }

    public function getOrigin(){
        return "C:/xampp/htdocs/updivision/public/images/";
    }

    public function folder_exist($folder){
        $path = realpath($folder);
        return ($path !== false && is_dir($path)) ? true : false;
    }

    public function create(Request $request) {
        $book = new Book();

        $book->name = $request->name;
        $book->description = $request->description;
        $book->author_id = $request->author_id;
        $book->tags = $request->tags;

        $image = $request->cover_image;
        $book->cover_image = pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME) . '-' . str_random(6) . ".png";

        $destinationPath = $this->getOrigin() . $book->cover_image;
        if (!$this->folder_exist($this->getOrigin()))
            mkdir($this->getOrigin(), 0777, true);

        $imageToBeSaved = Image::make($image->getRealPath())->encode('png');
        $imageToBeSaved->save($destinationPath);

        if($book->save())
            return response()->json($book->id,201);

        return response()->json('There was an error',500);
    }

    public function edit(Request $request){
        $book = Book::find($request->id);

        $book->name = $request->name;
        $book->description = $request->description;

        if($request->hasFile("cover_image")){
            $image = $request->cover_image;
            $destinationPath = $this->getOrigin() . $book->cover_image;
            $imageToBeSaved = Image::make($image->getRealPath())->encode('png');
            $imageToBeSaved->save($destinationPath);
        }

        $book->author_id = $request->author_id;
        $book->tags = $request->tags;

        if($book->save())
            return response()->json($book->id,201);

        return response()->json('There was an error',500);
    }

    public function delete($id){
        if(Book::destroy($id))
            return response()->json('Book successfully deleted',201);

        return response()->json('There was an error',500);
    }
}
