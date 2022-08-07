<?php

namespace App\Http\Controllers;

use App\Models\Person;
use Illuminate\Http\Request;
use LaravelLegends\PtBrValidator\Rules\Cpf;
use LaravelLegends\PtBrValidator\Rules\CelularComDdd;
use LaravelLegends\PtBrValidator\Rules\FormatoCpf;

class PersonController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Person::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $formField = $request->validate([
            'fullname' => 'required',
            'cpf' => ['required', new Cpf, new FormatoCpf],
            'nickname' => 'required',
            'gender' => 'required',
            'phone' => ['required', new CelularComDdd],
            'address' => 'required',
            'note' => 'required',
            'image' => ['image', 'mimes:jpeg,png,jpg,gif,svg', 'required']
        ]);

        if($request->hasFile('image')) {
            $img = $request->file('image')->store('people', 'public');
            $formField['image'] = $img;
        }

        $result = Person::create($formField);

        if($result) {
            return response($result, 201);
            // return $result;
        } else {
            return response('Error', 400);
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Person::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $formField = $request->validate([
            'fullname' => 'required',
            'cpf' => ['required', new Cpf, new FormatoCpf],
            'nickname' => 'required',
            'gender' => 'required',
            'phone' => ['required', new CelularComDdd],
            'address' => 'required',
            'note' => 'required',
            'image' => ['image', 'mimes:jpeg,png,jpg,gif,svg', 'required']
        ]);

        if($request->hasFile('image')) {
            $img = $request->file('image')->store('people', 'public');
            $formField['image'] = $img;
        }

        $person = Person::findOrFail($id);

        $result = $person->update($formField);

        if($result) {
            return response($result, 201);
            // return $result;
        } else {
            return response('Error', 400);
        }
    }



    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $person = Person::destroy($id);

        if($person) {
            return response("Pessoa deletada com sucesso!", 200);
        } else {
            return response()->json(['message' => 'Person not found'], 404);
        }
    }

    public function search($name)
    {
        $result = Person::where('fullname', 'like', "%{$name}%")->get();

        if($result) {
            return response($result, 200);
        } else {
            return response("Erro ao realizar a busca!", 404);
        }
    }
}
