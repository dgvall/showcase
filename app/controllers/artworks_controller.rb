class ArtworksController < ApplicationController

  def create
    artwork = @current_user.artworks.build(artwork_params)

    if artwork.save
      render json: artwork, status: :created
    else
      render json: { errors: artwork.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def artwork_params
    params.require(:artwork).permit(:title, :image_url, tags_attributes: [:name])
  end


end
