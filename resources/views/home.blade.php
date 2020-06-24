@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Dashboard</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    <form action="/Share" method="Post">
                        @csrf
                        <div class="form-group">
                            <label for="exampleFormControlTextarea1">Write Somthing To Share With Others</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>

                            <input type="submit" class="btn btn-success mt-2" value="Share Your Thoughts" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
