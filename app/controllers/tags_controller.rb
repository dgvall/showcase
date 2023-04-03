class TagsController < ApplicationController
  skip_before_action :authorize, only: [:index]

  def index
    tags = Tag.all
    render json: tags
  end
end
