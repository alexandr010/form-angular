import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormControl, FormArray, ValidationErrors} from "@angular/forms";
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    this.onChanges();
    this.addHobby();
  }

  profileForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    secondName: new FormControl('', Validators.required),
    userBirthday: new FormControl(Validators.required),
    technologySelect: new FormControl(Validators.required),
    versionTechnology: new FormControl([], Validators.required),
    userEmail: new FormControl('', [Validators.required, Validators.email],[this.emailValidator]),
    hobby: new FormArray([])
  })

  technology = [
    {
      title: 'React',
      value: 'react'
    },
    {
      title: 'Angular',
      value: 'angular'
    },
    {
      title: 'Vue',
      value: 'vue'
    }
  ];
  versionTechnology = {
    angular: ['1.1.1', '1.2.1', '1.3.3'],
    react: ['2.1.2', '3.2.4', '4.3.1'],
    vue: ['3.3.1', '5.2.1', '5.1.3'],
  };

  listOfTechnology = [];

  onChanges() {
    this.profileForm.get('technologySelect').valueChanges
      .subscribe(selectedTech => {
        if (selectedTech) {
          this.profileForm.get('versionTechnology').enable()
          this.listOfTechnology = this.versionTechnology[selectedTech]
        }
      })
  }

  get hobby(): FormArray {
    return <FormArray>this.profileForm.get('hobby');
  }

  addHobby() {
    (<FormArray>this.profileForm.get('hobby')).push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        duration: new FormControl('', Validators.required)
      })
    )
  }

  emailValidator(control: FormControl) {
    return new Promise((res) => {
      if (control.value === 'test@test.test') {
        setTimeout(() =>{
          res ({invalidEmail: 'Такой email уже существует'})
        }, 2000);
      } else res(null);
    })
  }

  submit() {
    const form = {
      ...this.profileForm.value,
      userBirthday: dayjs(this.profileForm.value.userBirthday).format('DD-MM-YYYY'),
    };
    console.log(form)
  }
}
