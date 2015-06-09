class ArticlesController < ApplicationController
  def index
    @articles = Article.all.sort_by{|a| a.created_at}
  end

  def show
    @article = Article.find(params[:id])
  end
end
