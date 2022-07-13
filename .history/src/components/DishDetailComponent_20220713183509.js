// import { Card, CardImg, CardText, CardBody,
//     CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
// import { Link } from 'react-router-dom';

   
//    function RenderDish({dish}) {  
   
// 		return (
// 		   <div className="col-12 col-md-5 m-1">
// 			   <Card>
// 				  <CardImg top src={dish.image} alt={dish.name} />
// 				  <CardBody>
// 					 <CardTitle>{dish.name}</CardTitle>
// 					 <CardText>{dish.description}</CardText>
// 				  </CardBody>
// 			   </Card>
// 		   </div>
// 		);
		
//    }
   
//    function RenderComments({comments}) {
	   
// 	 if (comments != null) {
// 		return (
// 		   <div className="col-12 col-md-5 m-1">
// 			  <h4>Comments</h4>
// 			  <ul className="list-unstyled">
// 			  {comments.map((comment) => {
// 				 return (
// 					<li key={comment.id}>
// 					  <p>{comment.comment}</p>
// 					  <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
// 					</li>
// 				 );
// 			   })}
// 			   </ul>
// 		   </div>
// 		);
// 	 }
// 	 else {
// 		return (
// 		   <div></div>
// 		);
// 	 }
	 
//    }

//    const  DishDetail = (props) => {   
   
// 	 if (props.dish != null) {
// 		return (
// 			<div className="container">
//                 <div className="row">
//                     <Breadcrumb>

//                         <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
//                         <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
//                     </Breadcrumb>
//                     <div className="col-12">
//                         <h3>{props.dish.name}</h3>
//                         <hr />
//                     </div>                
//                 </div>
//                 <div className="row">
//                     <div className="col-12 col-md-5 m-1 ">
//                         <RenderDish dish={props.dish} />
//                     </div>
//                     <div className="col-12 col-md-5 m-1 ">
//                         <RenderComments comments={props.comments} />
//                     </div>
//                 </div>
//                 </div>
//             );

// 		//    <div className="container">
// 		// 	  <div className="row">
// 		// 		 <RenderDish dish={props.dish} />
// 		// 		 <RenderComments comments={props.dish.comments} />
// 		// 	  </div>
// 		//    </div>
// 		// );
// 	 }
// 	 else {
// 		return (
// 		   <div></div> 
// 		);
// 	 }
	 
//    }
   

   

// export default DishDetail;


import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
const maxLength = (length) => (value) => !(value) || (value.length <= length);
const minLength = (length) => (value) => (value) && (value.length >= length);

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    this.toggleModal();
    this.props.postComment(
      this.props.dishId, 
      values.rating, 
      values.author, 
      values.comment);
  }
  
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  render() {
    return(
      <>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg"> Submit Comment</span>
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="rating" md={2}>Rating</Label>
                <Col md={12}>
                  <Control.select model=".rating" id="rating" name="rating" className="form-control">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="author" md={4}>Your Name</Label>
                <Col md={12}>
                  <Control.text model=".author" id="author" name="author" placeholder="Your Name" 
                  className="form-control" 
                  validators={{
                    minLength: minLength(3),
                    maxLength: maxLength(15)
                  }}/>
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      minLength: 'Must be greater than 2 characters',
                      maxLength: 'Must be 15 characters or less'
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="comment" md={2}>Comment</Label>
                <Col md={12}>
                <Control.textarea model=".comment" id="comment" name="comment" rows="6" className="form-control">
                </Control.textarea>
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={{size:10, offset:2}}>
                  <Button type="submit" color="primary">
                    Send Feedback
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

function RenderDish({dish}) {
  return (

      <Card>
        <CardImg width="100%" src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle heading>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
  );
}


	function RenderComments({ comments, postComment, dishId }) {
		var commentList = comments.map(comment => {
			return (

					<li key={comment.id} >
						{comment.comment}
						<br /><br />
						-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}
						<br /><br />
					</li>

			);
		});
	
		return (
			<div>
				<h4>Comments</h4>
				<ul className="list-unstyled">

						{commentList}

				</ul>
				<CommentForm dishId={dishId} postComment={postComment} />
			</div>
		);
	}

const DishDetail = (props) => {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
        </div>
      </div>
    );
  }

  else if (props.dishesErrMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.dishesErrMess}</h4>
        </div>
      </div>
    );
  }

  else if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to ='/home'>Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link to ='/menu'>Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
          <div className="row">
            <div className="col-12 col-md-5 m-1">
              <RenderDish dish={props.dish} />
            </div>
            <div className="col-12 col-md-5 m-1">
              <RenderComments 
                comments={props.comments} 
                postComment={props.postComment} 
                dishId={props.dish.id} />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  else {
    return (
      <div></div>
    );
  }
}


export default DishDetail;
