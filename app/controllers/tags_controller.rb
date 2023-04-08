class TagsController < ApplicationController
  skip_before_action :authorize, only: [:index, :filtered]

  def index
    tags = Tag.all
    render json: tags
  end

  def filtered
    tags = Tag.find_by(name: params[:name])
    render json: tags, include: ['artworks', 'artworks.user']
  end
end
