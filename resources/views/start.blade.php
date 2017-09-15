@extends('layouts.client')
@section('content')
<!-- Page Header -->
<div class="row">
    <div class="col-lg-12">
        <h1 class="page-header">{{ $start->title }}
                <small>({{ $start->date }}) </small>
        </h1>
    </div>
</div>
<div class="row">
    <div class="col-md-4">
        <img class="img-responsive" src="/{{$start->photo}}"  alt="">
    </div>
    <div class="col-md-8">
        <div class="page-header">
            <h1>{{ $start->title }}</h1>
            <p>Дата проведения: {{ $start->date }} </p>
            <p>Время проведения: {{ $start->time }} </p>
        </div>
        <div class="panel panel-default">
        <div class="panel-heading">Подробнее...</div>
            <div class="panel-body">
                {!! $start->description !!}
            </div>
        </div>
        </div>
    </div>
@endsection