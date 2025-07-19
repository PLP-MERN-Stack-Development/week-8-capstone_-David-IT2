<?php

namespace App\Http\Controllers;

use App\Models\Calculation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CalculatorController extends Controller
{
    public function calculate(Request $request)
    {
        // Validate input
        $validator = Validator::make($request->all(), [
            'a' => 'required|numeric',
            'b' => 'required|numeric',
            'operation' => 'required|in:add,subtract,multiply,divide',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Invalid input'], 400);
        }

        $a = $request->input('a');
        $b = $request->input('b');
        $operation = $request->input('operation');
        $result = null;

        // Perform calculation
        switch ($operation) {
            case 'add':
                $result = $a + $b;
                break;
            case 'subtract':
                $result = $a - $b;
                break;
            case 'multiply':
                $result = $a * $b;
                break;
            case 'divide':
                if ($b == 0) {
                    return response()->json(['error' => 'Invalid operation'], 400);
                }
                $result = $a / $b;
                break;
        }

        // Save calculation to database
        $calculation = Calculation::create([
            'a' => $a,
            'b' => $b,
            'operation' => $operation,
            'result' => $result,
        ]);

        return response()->json(['id' => $calculation->id, 'result' => $result], 200);
    }

    public function getCalculation($id)
    {
        $calculation = Calculation::find($id);
        if (!$calculation) {
            return response()->json(['error' => 'Not found'], 404);
        }

        return response()->json($calculation);
    }

    public function getLastFiveCalculations(Request $request)
    {
        // Fetch the last 5 calculations
        $calculations = Calculation::orderBy('created_at', 'desc')->take(5)->get();
        return response()->json($calculations);
    }
}
