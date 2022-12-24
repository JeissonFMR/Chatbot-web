from django.db import models
from django.urls import reverse
# Create your models here.
class opciones(models.Model):
    clave = models.CharField(max_length=150, null=True, verbose_name='Palabra clave para dar una respuesta')
    descripcion = models.CharField(max_length=200, null=True, verbose_name='Descripción de lo que hara la clave')
    respuest = models.CharField(max_length=500, null=True, verbose_name='Respuesta que dará el Chatbot')
    class Meta:
        db_table = "opciones"
    def __str__(self):
        template = '{0.nameproyecto} {0.clave} {0.respuest}'
        return template.format(self)
    
    def get_absolute_url(self):
        return reverse("index_Login")