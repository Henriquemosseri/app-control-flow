import { ValueOf } from './../../../../node_modules/dot-prop/node_modules/type-fest/source/value-of.d';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categoria } from '../../interfaces/Categoria';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent {
  categoriaForm: FormGroup= new FormGroup({});
  categorias:Categoria[]=[]
  constructor(
    private categoriaService:CategoriaService,
    private FormBuilder: FormBuilder
  ){
    this.categoriaForm = FormBuilder.group({
      nome: ['', Validators.required],
      descricao: [''],
      ativa:['', Validators.required]
    })
  }
  ngOnInit():void{
    this.list()
  }
  list():void{
    this.categoriaService.list().subscribe((resposta)=>(this.categorias=resposta))
  }
}
