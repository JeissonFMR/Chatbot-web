from django.urls import include, path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    
    #TODO: es donde se lista todo
    path('',views.TodoListView.as_view(),name='index_Login'),
    path('crear_opcion/', views.OpcionesCreateView.as_view(),name='crear_opcion'),
    path('editar_opcion/<int:pk>',views.OpcionesUpdateView.as_view(),name='editar_opcion'),
   path('eliminar_opcion/<int:pk>',views.OpcionesDeleteView.as_view(),name='eliminar_opcion'), 
 ]