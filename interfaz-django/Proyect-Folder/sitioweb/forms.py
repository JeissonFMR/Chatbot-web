
from django.forms import TextInput, TimeInput, ModelForm, RadioSelect, HiddenInput

from .models import *

class OpcionesFormulario(ModelForm):
    class Meta:
        model = opciones
        fields = '__all__'
        widgets = {
            #PREGUNTAR PORQUE NO FUNCIONA EL PLACEHOLDER
            
            'clave':TextInput(attrs={'type': 'text','class' : 'nombre_proceso', 'placeholder':'Clave para identificación', 'required' : 'required' }),
            'descripcion':TextInput(attrs={'type': 'text','class' : 'descripcion_proceso', 'placeholder':'Descripción de lo que hace la clave', 'required' : 'required' }),
            'respuest':TextInput(attrs={'type': 'text','class' : 'pregunta_proceso', 'placeholder':'Respuesta que dará el Bot', 'required' : 'required' }),
            
        }

