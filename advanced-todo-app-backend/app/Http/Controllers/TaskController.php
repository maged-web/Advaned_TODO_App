<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $search=$request->query('search');
        $sort_field=$request->query('sortField','created_at');
        $sort_order=$request->query('sortOrder','asc');

        $filter_with_status=$request->query('filterWithStatus');
        $filter_with_category=$request->query('filterWithCategory');


        $query=Task::where('user_id', Auth::id())->with('category');

        if($filter_with_status)
        {
            $query->where('status',$filter_with_status);
        }

        if($filter_with_category)
        {
            $query->where('category_id',$filter_with_category);
        }


        if($search)
        {
            $query->where(function($q) use ($search)
            {
                $q->where('title','like',"%{$search}%")
                ->orWhere('description','like',"%{$search}%");
            });
        }
        $tasks=$query->orderBy($sort_field,$sort_order)->paginate(3);
        return response()->json($tasks);
    }

    public function getSingleTask(Request $request,$id)
    {
         $task = Task::findOrFail($id);
        return response()->json($task);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|nullable|string',
            'status' => 'required|in:pending,completed',
            'category_id' => 'required|exists:categories,id',
        ]);

        $task = Task::create([
            'title' => $request->title,
            'description' => $request->description,
            'status' => $request->status,
            'user_id' => Auth::id(),
            'category_id' => $request->category_id,
        ]);


        return response()->json($task, 201);
    }
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|nullable|string',
            'status' => 'required|in:pending,completed',
            'category_id' => 'required|exists:categories,id',
        ]);

        $task = Task::where('id', $id)
                    ->where('user_id', Auth::id())
                    ->firstOrFail();

        $task->update([
            'title' => $request->title,
            'description' => $request->description,
            'status' => $request->status,
            'category_id' => $request->category_id,
        ]);

        return response()->json($task);
    }
    public function destroy($id)
    {
        $task = Task::where('id', $id)
                    ->where('user_id', Auth::id())
                    ->firstOrFail();

        $task->delete();

        return response()->json(['message' => 'Task deleted successfully']);
    }
    public function getTrashedTasks()
    {
        $tasks = Task::onlyTrashed()
                    ->where('user_id', Auth::id())->get();


        return response()->json(['message' => 'Task retrived successfully', 'tasks' => $tasks]);
    }
    public function restore($id)
    {
        $task = Task::onlyTrashed()
                    ->where('id', $id)
                    ->where('user_id', Auth::id())
                    ->firstOrFail();

        $task->restore();

        return response()->json(['message' => 'Task restored successfully', 'task' => $task]);
    }
    public function forceDelete($id)
    {
        $task = Task::onlyTrashed()
                    ->where('id', $id)
                    ->where('user_id', Auth::id())
                    ->firstOrFail();

        $task->forceDelete();

        return response()->json(['message' => 'Task deleted successfully']);
    }
    public function statusUpdate($id)
    {
        $task = Task::where('id', $id)
                    ->where('user_id', Auth::id())
                    ->firstOrFail();

        $task->update([
            'status'=>'completed'
        ]);
        return response()->json(['message' => 'Task updated successfully']);
    }
}
