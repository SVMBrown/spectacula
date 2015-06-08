class CommentsController < ApplicationController
   skip_before_filter :require_login

  def show
    @comment = Comment.find(params[:id])
  end

  def create
    @comment = Comment.new(comment_params)
    if @comment.save
      redirect_to user_path(@comment.subject_id), notice: 'Comment submitted!'
    else
      redirect_to user_path(@comment.subject_id)
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy
  end

  private
  def comment_params
    params.require(:comment).permit(:comment, :author_id, :subject_id)
  end

end
