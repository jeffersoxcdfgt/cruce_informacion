import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'redux-app-endversion';

  //https://ingenieriadesoftware.es/tipos-sql-join-guia-referencia/

  constructor(){
      console.log('Mis pruebas')
      //this.joinTwoTables()      //Solo los registros comunes de las dos tablas
      //this.letJoinTwoTables();  //Todos los registros de la izquierda , y los comunes de las dos tablas
      //this.letJoinTwoTablesNocommon();  //Solo los registros de la izquierza , que no sean comunes entre las dos tablas
      //this.rightJoin();     //Todos los registros de la derecha , y los comunes de las dos tablas
      //this.rightJoinNocommon(); //Solo los registros de la derecha , que no sean comunes entre las dos tablas
      //this.fullOuterJoin(); //Todos los registros de las dos tablas incluidos los comunes
      this.fullOuterJoinNoCommon()
  }


  fullOuterJoinArrayNoCommon(projects,members){
    let projectCommon= projects.map( project =>{
      return members
        .filter(member => member.project_id == project.id)
        .map((memberCross)=>{
           return {
               id:project.id,
               title:project.title,
               id_member:memberCross.id,
               name:memberCross.name
           }
        })
    }).reduce((a,b) =>{
        return a.concat(b)
    },[])

   let proNocommon=projects.filter((val)=>{
      return  projectCommon
              .find((myval) => myval.id ==val.id ) == undefined
   })

   let memNocommon=members.filter((val)=>{
    return projectCommon
        .find((myval) => myval.id == val.project_id) == undefined
   })

    return [
      ...proNocommon,
      ...memNocommon
    ]
  }


  fullOuterJoinArray(table_A,table_B){

    let x = table_A.map( rowA =>{
      return table_B
        .filter(rowB => rowB.A == rowA.A)
        .map((rows)=>{
           return {
            A:rows.A,
            M:rowA.M,
            N:rows.N
           }
        })
    }).reduce((a,b) =>{
        return a.concat(b)
    },[])

    let resA=table_A.map((val)=>{
        return {
          A:val.A,
          M:val.M,
          N:null
        }
    })

    let resB = table_B.map((val)=>{
      return{
        A:val.A,
        N:val.N,
        M:null
      }
    })

    let resFinal = {
        ...resA,
        ...resB,
        ...x
    }


    return resFinal

  }

  rightJoinNocommonArray(personas,departamentos){
    let departamentosJoin= departamentos.map( departamento =>{
      return personas
        .filter(persona => persona.dep == departamento.dep )
        .map((persona)=>{
           return {
             dep:departamento.dep,
             departamento:departamento.departamento,
             id:persona.id,
             nombre:persona.nombre,
             apellido1:persona.apellido1,
             apellido2:persona.apellido2
           }
        })
    }).reduce((a,b) =>{
        return a.concat(b)
    },[])

    let all = departamentos.map(departamento => {
      return {
        dep:departamento.dep,
        departamento:departamento.departamento,
        id:null,
        nombre:null,
        apellido1:null,
        apellido2:null
      }
    })

    let resDepartamentos = {
       ...all,
       ...departamentosJoin
    }

    return Object.keys(resDepartamentos).map((k) =>resDepartamentos[k])
                    .filter((resDepartamento) => resDepartamento.id == null)
  }


  rigtJoinArray(personas,departamentos){
    let departamentosJoin= departamentos.map( departamento =>{
      return personas
        .filter(persona => persona.dep == departamento.dep )
        .map((persona)=>{
           return {
             dep:departamento.dep,
             departamento:departamento.departamento,
             id:persona.id,
             nombre:persona.nombre,
             apellido1:persona.apellido1,
             apellido2:persona.apellido2
           }
        })
    }).reduce((a,b) =>{
        return a.concat(b)
    },[])

    let all = departamentos.map(departamento => {
      return {
        dep:departamento.dep,
        departamento:departamento.departamento,
        id:null,
        nombre:null,
        apellido1:null,
        apellido2:null
      }
    })

    let resDepartamentos = {
       ...all,
       ...departamentosJoin
    }

    return Object.keys(resDepartamentos).map((k) =>resDepartamentos[k])
  }

  leftJoinNocommon(personas,departamentos){
    let personasJoin= personas.map( persona =>{
      return departamentos
        .filter(departamento => departamento.dep == persona.dep )
        .map((persDepto)=>{
           return {
               per:persona.per,
               nombre:persona.nombre,
               apellido1:persona.apellido1,
               apellido2:persona.apellido2,
               dep:persona.dep
           }
        })
    }).reduce((a,b) =>{
        return a.concat(b)
    },[])

    let all = personas.map(persona => {
      return {
        per:persona.per,
        nombre:persona.nombre,
        apellido1:persona.apellido1,
        apellido2:persona.apellido2,
        dep:null
      }
    })

    let resPersonas = {
       ...all,
       ...personasJoin
    }

    return Object.keys(resPersonas).map((k) =>resPersonas[k])
                .filter((resPersona) => resPersona.dep == null)
  }

  leftJoin(personas,departamentos){
    let personasJoin= personas.map( persona =>{
      return departamentos
        .filter(departamento => departamento.dep == persona.dep )
        .map((persDepto)=>{
           return {
               per:persona.per,
               nombre:persona.nombre,
               apellido1:persona.apellido1,
               apellido2:persona.apellido2,
               dep:persona.dep
           }
        })
    }).reduce((a,b) =>{
        return a.concat(b)
    },[])

    let all = personas.map(persona => {
      return {
        per:persona.per,
        nombre:persona.nombre,
        apellido1:persona.apellido1,
        apellido2:persona.apellido2,
        dep:null
      }
    })

    let resPersonas =  {
       ...all,
       ...personasJoin
    }

    return Object.keys(resPersonas).map((k) =>resPersonas[k])
  }

  Innerjoin(customers,orders){
    return customers.map( customer =>{
      return orders
        .filter(order => order.CustomerID == customer.CustomerID)
        .map((ordersCross)=>{
           return {
               CustomerID:customer.CustomerID,
               CustomerName:customer.CustomerName,
               ContactName:customer.ContactName,
               Address:customer.Address,
               City:customer.City,
               PostalCode:customer.PostalCode,
               Country:customer.Country,
               OrderID:ordersCross.OrderID,
               EmployeeID:ordersCross.EmployeeID,
               OrderDate:ordersCross.OrderDate,
               ShipperID:ordersCross.ShipperID
           }
        })
    }).reduce((a,b) =>{
        return a.concat(b)
    },[])
  }

  joinTwoTables(){ //INNER JOIN
     let orders=[
        { OrderID:10308, CustomerID:2, EmployeeID:7, OrderDate:'1996-09-18', ShipperID:3 },
        { OrderID:10309, CustomerID:37,EmployeeID:3, OrderDate:'1996-09-19',ShipperID:1 },
        { OrderID:10310, CustomerID:77,EmployeeID:8, OrderDate:'1996-09-20',ShipperID:2 }
    ]

    let customers=[
      { CustomerID:1, CustomerName:'Alfreds Futterkiste', ContactName:'Maria Anders', Address:'Obere Str. 57', City:'Berlin', PostalCode:'12209', Country:'Germany'},
      { CustomerID:2, CustomerName:'Ana Trujillo Emparedados y helados', ContactName:'Ana Trujillo', Address:'Avda. de la Constitución 2222',City:'México D.F.', PostalCode:'05021', Country:'Mexico'},
      { CustomerID:3, CustomerName:'Antonio Moreno Taquería', ContactName:'Antonio Moreno', Address:'Mataderos 2312', City:'México D.F.',PostalCode:'05023', Country:'Mexico' }
    ]

    console.log('Inner join, Solo los comunes')
    console.log(this.Innerjoin(customers,orders))
  }

  letJoinTwoTables(){
      let personas = [
         { per:1, nombre:'ANTONIO', apellido1:'PEREZ', apellido2:'GOMEZ', dep:1  },
         { per:2, nombre:'ANTONIO',apellido1:'GARCIA', apellido2:'RODRIGUEZ', dep:2  },
         { per:3, nombre:'PEDRO', apellido1:'RUIZ', apellido2:'GONZALEZ', dep:4 },
         { per:4, nombre:'MARCOS',apellido1:'MEDINA',apellido2:'PEREZ',dep:5 }
      ]

      let departamentos = [
        { dep:1, departamento:'ADMINISTRACION'},
        { dep:2, departamento:'INFORMATICA' },
        { dep:3, departamento:'COMERCIAL'}
      ]

      console.log('Letf join , todos los de la izquierda y los comunes')
      console.log(this.leftJoin(personas,departamentos))
  }

  letJoinTwoTablesNocommon(){
    let personas = [
       { per:1, nombre:'ANTONIO', apellido1:'PEREZ', apellido2:'GOMEZ', dep:1  },
       { per:2, nombre:'ANTONIO',apellido1:'GARCIA', apellido2:'RODRIGUEZ', dep:2  },
       { per:3, nombre:'PEDRO', apellido1:'RUIZ', apellido2:'GONZALEZ', dep:4 },
       { per:4, nombre:'MARCOS',apellido1:'MEDINA',apellido2:'PEREZ',dep:5 }
    ]

    let departamentos = [
      { dep:1, departamento:'ADMINISTRACION'},
      { dep:2, departamento:'INFORMATICA' },
      { dep:3, departamento:'COMERCIAL'}
    ]

    console.log('Letf join Solo los de la izquierda, que no sean comunes')
    console.log(this.leftJoinNocommon(personas,departamentos))
  }

  rightJoin(){
    let personas = [
      { id:1,  nombre:'ANTONIO',  apellido1:'PEREZ', apellido2:'GOMEZ', dep:1 },
      { id:2,  nombre:'ANTONIO',  apellido1:'GARCIA',apellido2:'RODRIGUEZ', dep:2 },
      { id:3,  nombre:'PEDRO',    apellido1:'RUIZ', apellido2:'GONZALEZ', dep:4 }
    ]

    let departamentos = [
      { dep:1, departamento:'ADMINISTRACION' },
      { dep:2, departamento:'INFORMATICA' },
      { dep:3, departamento:'COMERCIAL' }
    ]

    console.log('Right join , todos los de la derecha y los comunes')
    console.log(this.rigtJoinArray(personas,departamentos))
  }

  rightJoinNocommon(){
    let personas = [
      { id:1,  nombre:'ANTONIO',  apellido1:'PEREZ', apellido2:'GOMEZ', dep:1 },
      { id:2,  nombre:'ANTONIO',  apellido1:'GARCIA',apellido2:'RODRIGUEZ', dep:2 },
      { id:3,  nombre:'PEDRO',    apellido1:'RUIZ', apellido2:'GONZALEZ', dep:4 }
    ]

    let departamentos = [
      { dep:1, departamento:'ADMINISTRACION' },
      { dep:2, departamento:'INFORMATICA' },
      { dep:3, departamento:'COMERCIAL' }
    ]

    console.log('Right join Solo los de la derecha, que no sean comunes')
    console.log(this.rightJoinNocommonArray(personas,departamentos))
  }


  fullOuterJoin(){

    let table_A= [
      { A:1, M:'m'},
      { A:2, M:'n'},
      { A:4, M:'o'}
    ]

    let table_B= [
      { A:2,N:'p'},
      { A:3,N:'q'},
      { A:5,N:'r'}
    ]

    console.log('Todos los registros de ambas tablas , incluidos los comunes')
    console.log(this.fullOuterJoinArray(table_A, table_B))

  }


  fullOuterJoinNoCommon(){

    let projects = [
      {
        id:1,
        title:'New CRM for Projects Sales'
      },
      {
        id:2,
        title:'ERP Implementation'
      },
      {
        id:3,
        title:'Develop Mobiles Sales Platform'
      }
    ]

    let members = [
      {
        id:1,
        name:'John Doe',
        project_id:1
      },
      {
        id:2,
        name:'Lili Bush',
        project_id:1
      },
      {
        id:3,
        name:'Jane Doe',
        project_id:2
      },
      {
        id:4,
        name:'Jack Daniel',
        project_id:null
      }
    ]


    console.log('Todos los registros de ambas tablas , sin incluir los comunes')
    console.log(this.fullOuterJoinArrayNoCommon(projects, members))
  }

}
