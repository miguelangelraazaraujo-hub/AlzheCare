package com.alzhecare.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(
        name = "articulo_categoria",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_articulo_categoria",
                        columnNames = {"id_articulo", "id_categoria"}
                )
        }
)
public class ArticleCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_articulo_categoria")
    private Integer idArticuloCategoria;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_articulo", nullable = false)
    private Article article;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_categoria", nullable = false)
    private Category category;

    public ArticleCategory() {
    }

    public ArticleCategory(Article article, Category category) {
        this.article = article;
        this.category = category;
    }

    public Integer getIdArticuloCategoria() {
        return idArticuloCategoria;
    }

    public void setIdArticuloCategoria(Integer idArticuloCategoria) {
        this.idArticuloCategoria = idArticuloCategoria;
    }

    public Article getArticle() {
        return article;
    }

    public void setArticle(Article article) {
        this.article = article;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}