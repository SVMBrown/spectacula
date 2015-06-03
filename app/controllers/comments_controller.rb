class CommentsController < ApplicationController
   skip_before_filter :require_login


  def create
    @comment = Comment.new(comment_params)
    @comment.user_id = current_user.id
   if @comment.save
      redirect_back_or_to user_path(current_user.id), notice: 'Comment submitted!'
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
    params.require(:comment).permit(:comment)
  end

end