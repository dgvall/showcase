class UserLikesController < ApplicationController
  # skip_before_action :authorize, only: []

  def create
    artwork = Artwork.find(params[:artwork_id])
    like = artwork.user_likes.build(user_id: @current_user.id)
    if like.save
      render json: like, status: :created
    else
      render json: {errors: ["Can't like this artwork"]}, status: :unprocessable_entity
    end
  end

  def destroy
    artwork = Artwork.find(params[:id])
    like = artwork.user_likes.find_by(user_id: @current_user.id)

    if (like)
    like.destroy
    else
    render json: {errors: ["Not liked"]}, status: :unprocessable_entity
    end
  end

  private

  def user_likes_params
    params.permit(:artwork_id)
  end
end