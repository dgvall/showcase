class ArtworksController < ApplicationController
  skip_before_action :authorize, only: [:index]

  def create
    artwork = @current_user.artworks.build(artwork_params)
    params[:tags].each do |t|
      tag = Tag.find_by(name: t)
      if tag
        artwork.tags << tag
      else
        artwork.tags.build(name: t)
      end
    end

    if artwork.save
      render json: artwork, status: :created
    else
      render json: { errors: artwork.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    artwork = Artwork.find(params[:id])
    artwork.update(title: params[:title], image_url: params[:image_url])


    artwork.tags = params[:tags].map do |t|
      Tag.find_or_create_by(name: t)
    end

    if artwork.save
      render json: artwork
    else
      render json: { errors: artwork.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def index
    artworks = Artwork.all
    render json: artworks, status: :ok
  end

  private

  def artwork_params
    params.require(:artwork).permit(:title, :image_url, :tags)
  end


end
