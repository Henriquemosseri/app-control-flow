import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cliente } from '../../interfaces/Cliente';
import { ClienteService } from './../../services/cliente.service';
@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent {
  clienteForm: FormGroup = new FormGroup({});
  clientes: Cliente[] = [];
  clienteIdEdicao: string | null = null
  constructor(
    private clienteService: ClienteService,
    private FormBuilder: FormBuilder) {
    this.clienteForm = FormBuilder.group({
      nome: ['', Validators.required],
      telefone: ['']
    })

  }

  list(): void {
    this.clienteService.list().subscribe((resposta)=> (this.clientes=resposta))
  }
  //metodo executado ao inicializar a página
  ngOnInit(): void {
    this.list()
  }
  generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  save() {
    if (this.clienteForm.valid) {
      const formData = this.clienteForm.value

      if (this.clienteIdEdicao) {
        const clienteUpdate: Cliente = {
          id: this.clienteIdEdicao,
          nome: formData.nome,
          telefone: formData.telefone
        }
        this.clienteService.update(this.clienteIdEdicao, clienteUpdate)
        this.clienteIdEdicao = null
        alert('alterado com sucesso!')
      } else {
        const clienteAdd: Cliente = {
          id: this.generateRandomString(6),
          nome: formData.nome,
          telefone: formData.telefone,
        }
        // console.log(clienteAdd)
        this.clienteService.add(clienteAdd).subscribe() //chamando a service para inserir
        alert('Inserido com sucesso') // Enviando feedback ao usuário
      }
    }
    else {
      alert('Favor preencher os campos obrigatórios')
    }
    this.clienteForm.reset() //limpa o form após o preenchimento
    this.list();
  }
  editar(id: string): void {
    //Buscando todos clientes e filtrando pelo id enviado como parametro
    // const cliente = this.clienteService.list().find(c => c.id == id)
    // if (cliente) {
    //   this.clienteIdEdicao = cliente.id
    //   //atribuir os valores ao formulário
    //   this.clienteForm.patchValue({
    //     nome: cliente.nome,
    //     telefone: cliente.telefone
    //   })
    // }
    // console.log(cliente)


  }

  remover(id:string):void{
    this.clienteService.remove(id)
  }
}
