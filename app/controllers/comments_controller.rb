class CommentsController < ApplicationController
   skip_before_filter :require_login

  def show
    @comment = Comment.find(params[:id])
  end

  def create
    @comment = @comment.comments.build(comment_params)
    @commentuser = current_user
   if @comment.save
      redirect_to users_show_path, notice: 'Comment submitted!'
    else
      render 'users/show'
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy
  end

  private
  def comment_params
    params.require(:comment).permit(:comment, :username)
  end

end