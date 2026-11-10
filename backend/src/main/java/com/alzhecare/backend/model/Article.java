package com.alzhecare.backend.model;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity 
@Table(name = "articulo")
public class Article {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_articulo")
    private Integer id;

    @Column( name = "titulo", length = 200)
    private String titulo;
    
    @Column( name = "contenido", length = 500)
    private String contenido;

    @Column( name = "imagen", length = 255)
    private String imagen;

    @Column( name = "fuente", length = 255)
    private String fuente;

    @Column( name = "fecha_publicacion", length = 50)
    private Date fechaPublicacion;

    @Column( name = "fecha_actualizacion", length = 50)
    private String fechaActualizacion;

    @Column( name = "id_categoria")
    private Integer idCategory;

    public Article() {}
    
    public Article(String titulo, String contenido, String imagen, String fuente, Date fechaPublicacion, Date fechaActualizacion, Integer idCategory) {}

    public Integer getId() {return id;}
    public void setId(Integer id) {this.id = id;}

    public Integer getFuente() {return id;}
    public void setFuente(Integer id) {this.id = id;}

    public Integer getTiulo() {return id;}
    public void setTitulo(Integer id) {this.id = id;}

    public Integer getContenido() {return id;}
    public void setContenido(Integer id) {this.id = id;}

    public Integer getFechaPublicacion() {return id;}
    public void setFechaPublicacion(Integer id) {this.id = id;}

    public Integer getFechaActualizacion() {return id;}
    public void setFechaActualizacion(Integer id) {this.id = id;}

    public Integer getImagen() {return id;}
    public void setImagen(Integer id) {this.id = id;}

    public Integer getIdCategory() {return id;}
    public void setIdCategory(Integer id) {this.id = id;}
}
