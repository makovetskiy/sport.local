@extends('layouts.app')

@section('content')
<div class="container" id="sport-manager">
    
    <div class="row">
        <div class="col-md-4" >
            <div class="panel panel-primary">
                <div class="panel-heading">Список стартов</div>

                <div class="panel-body">
                <div class="list-group">
                    <a href="#" @click.prevent="editStart(start)" class="list-group-item " v-for="start in starts">
                        <h5 class="list-group-item-heading">@{{ start.title }}</h5>
                        <p class="list-group-item-text">дата проведения:@{{ start.date }}</p>
                    </a>
                </div>
                    <!-- Pagination -->
                    <nav>
                        <ul class="pagination">
                            <li v-if="pagination.current_page > 1">
                                <a href="#" aria-label="Previous"
                                @click.prevent="changePage(pagination.current_page - 1)">
                                    <span aria-hidden="true">«</span>
                                </a>
                            </li>
                            <li v-for="page in pagesNumber"
                                v-bind:class="[ page == isActived ? 'active' : '']">
                                <a href="#"
                                @click.prevent="changePage(page)">@{{ page }}</a>
                            </li>
                            <li v-if="pagination.current_page < pagination.last_page">
                                <a href="#" aria-label="Next"
                                @click.prevent="changePage(pagination.current_page + 1)">
                                    <span aria-hidden="true">»</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div>
                    <button class="btn btn-warning" @click.prevent="createStart()">Создать старт</button>
                </div>
            </div>
        </div>
        <div class="col-md-8">
            <div class="panel panel-primary">
              <div class="panel-heading" v-if="fillItem.title">@{{ fillItem.title}}</div>
              <div class="panel-heading" v-else>Новый старт</div>
                <div class="panel-body">
                    <form method="POST" enctype="multipart/form-data" v-on:submit.prevent="updateStart(fillItem.id)">
                    
                    <div class="form-group">
                        <label for="files">Изображение:</label>
                
                         <div class="container-fluid">
                            <div class="col-md-8">
                                <div v-if="!fillItem.photo">
                            
                                </div>
                                <div v-else>
                                    <img :src="fillItem.photo" width='300'/>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <input type="file" name="files[]" id="filer_input" multiple="multiple">
                                <input type="hidden" name="photo" v-model="fillItem.photo"/>
                            </div>
                         </div>
					</div>
		      		<div class="form-group">
						<label for="title">Название:</label>
						<input type="text" name="title" class="form-control" v-model="fillItem.title" />
						<span v-if="formErrorsUpdate['title']" class="error text-danger">@{{ formErrorsUpdate['title'] }}</span>
					</div>

					<div class="form-group">
						<label for="title">Описание:</label>
						<textarea name="description" class="form-control" v-tinymce-editor="tmc"  v-model="fillItem.description" id="editor">@{{tmc}}</textarea>
						<span v-if="formErrorsUpdate['description']" class="error text-danger">@{{ formErrorsUpdate['description'] }}</span>
					</div>

                    <div class="form-group">
						<label for="title">Дата проведения:</label>
						<input type="text" value="2012-05-15" name="date" class="form-control" id="datepicker" v-model="fillItem.date" />
						<span v-if="formErrorsUpdate['date']" class="error text-danger">@{{ formErrorsUpdate['date'] }}</span>
					</div>
                    <div class="form-group">
						<label for="Time">Время проведения:</label>
						<input type="text" name="time" id="time" class="form-control" v-model="fillItem.time" />
						<span v-if="formErrorsUpdate['time']" class="error text-danger">@{{ formErrorsUpdate['time'] }}</span>
					</div>
					<div class="form-group">
						<button type="submit" class="btn btn-success">Сохранить</button>
                        <button class="btn btn-danger" @click.prevent="deleteStart(fillItem.id)">Удалить</button>
					</div>

		      		</form>
                <div>
            </div>
        <div>
    </div>
</div>

@endsection
