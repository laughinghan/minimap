require 'sinatra'
require 'erubis'
require 'open-uri'

#templates are just in .
set :views, File.dirname(__FILE__)

get '/' do
  @url = request.query_string
  erb @url.empty? ? :minimap : :iframe
end

get '/dev' do
  @dev = true
  @url = request.query_string
  erb @url.empty? ? :minimap : :iframe
end

get '/proxy' do
  open(request.query_string)
end