import json
from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from .models import User
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
def index(request):
    users = serializers.serialize("json", User.objects.all())
    return HttpResponse(users)
@csrf_exempt
def add(request):
    body = json.loads(request.body.decode('utf-8'))
    user = User(body["id"],body["name"], body["email"], body["phone"])
    user.save()
    return HttpResponse("Add user response." )
