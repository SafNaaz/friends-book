import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/user.service';
import { Post } from '../../models/post';
import { ImageService } from '../../services/image.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  @Input() operation!: string;
  @Input() post!: Post;

  currentUser: User = new User;

  selectedFile!: ImageSnippet;

  submitted: boolean = false;
  loading = false;
  error = '';
  addPostSuccess = false;
  editPostSuccess = false;

  uploadedImageId:string= '';
  imageName:string= '';

  constructor(private fb: FormBuilder,
              private postService: PostService,
              private userService: UserService,
              private imageService: ImageService) { }

  ngOnInit(): void {
    this.currentUser = this.userService.currentUserValue;
    if(this.operation === 'edit'){
      this.addPostForm.patchValue({
        post:[this.post?.post]
      })
    }
  }

  get f() {
    return this.addPostForm.controls;
  }

  addPostForm = this.fb.group(
    {
      post: ['', [Validators.required, Validators.minLength(2)]],
    }
  );

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.addPostForm.invalid) {
      this.loading = false;
      return;
    }


    let post = new Post();
    post.isActive = true;
    post.isAdmin = this.currentUser.isAdmin;
    post.userId = this.currentUser._id;
    post.userName = this.currentUser.firstName+' '+this.currentUser.lastName;
    post.post = this.addPostForm.get('post')?.value;
    post.postImageId = this.addPostForm.get('postImage')?this.addPostForm.get('postImage')?.value : '';
    post.profession = this.currentUser.profession? this.currentUser.profession: 'Nil';
    post.userPhotoId = this.currentUser.photoId;
    post.postImageId = this.uploadedImageId;
    if(this.operation === 'edit'){
      post.id = this.post.id;
    }

    this.postService.addPost(post, this.operation).subscribe({
      next: () => {
        if(this.operation === 'edit'){
          this.editPostSuccess = true;
        }
        this.addPostSuccess = true;
        this.loading = false;
        this.addPostForm.get('post')?.reset()
        this.postService.getAllPosts();
        // this.router.navigate(['/login']);
      },
      error: (error) => {
        this.error = error;
        this.loading = false;
      },
    });
  }

  private onSuccess(file: any) {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
    this.imageName = file.file.name;
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.selectedFile.pending = true;
      this.imageService.uploadImage(this.selectedFile.file).subscribe(
        (res: any) => {
          this.onSuccess(this.selectedFile);
          this.uploadedImageId = res.uploadId
        },
        (err) => {
          this.onError();
        })
    });

    reader.readAsDataURL(file);
  }

  @Output() cancelEdit: EventEmitter<boolean> = new EventEmitter();

  cancel() {
      this.cancelEdit.emit(true);
    }

}

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {}
}
