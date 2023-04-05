class UserLikesController < ApplicationController
  # skip_before_action :authorize, only: []

  def create
    artwork = Artwork.find(params[:artwork_id])
    like = artwork.user_likes.create(user_id: @current_user.id)
    render json: like, status: :created
  end

  private

  def user_likes_params
    params.permit(:artwork_id)
  end
end