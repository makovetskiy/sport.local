@extends('layouts.client')
@section('content')
<!-- Page Header -->
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header">Список стартов
                </h1>
            </div>
        </div>
<!-- Projects Row -->
        <div class="row">
            @foreach ($starts as $start)
                <div class="col-md-4 portfolio-item">
                    <a href="{{ URL::to('home/' . $start->id) }}">
                        <img class="img-responsive" src="{{$start->photo}}"  alt="">
                    </a>
                    <h3>
                        <a href="{{ URL::to('home/' . $start->id) }}">{{ $start->title }}</a>
                    </h3>
                    <p>Дата проведения:{{ $start->date }} </p>
                    <p>Время проведения:{{ $start->time }} </p>
                </div>
            @endforeach
        </div>
        <hr>
        <!-- Pagination -->
        <div class="row text-center">
            <div class="col-lg-12">
                {{$starts->render()}}
            </div>
        </div>
        <!-- /.row -->
@endsection