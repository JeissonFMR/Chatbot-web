from django.shortcuts import render
from django.views.generic import ListView, View, CreateView, UpdateView, DeleteView


from .models import   *
from .forms import *
from django.urls import reverse_lazy
# Create your views here.
def index_Login(request):
    return render(request, 'index.html')

##CLASES
class TodoListView(ListView):
    model = opciones
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['object_list'] = opciones.objects.all()
        return context
    
class OpcionesCreateView(CreateView):
    model = opciones
    
    form_class = OpcionesFormulario
    template_name = 'crear.html'
    success_url: reverse_lazy('index_Login: opciones')
    def form_valid(self, form):
        form.instance.opciones = opciones.objects.all()
        return super().form_valid(form)

class OpcionesUpdateView(UpdateView):
    model = opciones
    form_class = OpcionesFormulario
    template_name = 'editar.html'
    success_url: reverse_lazy('index_Login: opciones')
    
class OpcionesDeleteView(DeleteView):
    model = opciones
    template_name = 'procesos_confirm_delete.html'
    success_url = '/'