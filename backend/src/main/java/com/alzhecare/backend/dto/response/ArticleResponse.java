package com.alzhecare.backend.dto.response;

import java.time.LocalDateTime;
import java.util.List;

public record ArticleResponse(
    Integer idArticulo,
    String titulo,
    String contenido,
    String imagen,
    String fuente,
    LocalDateTime fechaPublicacion,
    LocalDateTime fechaActualizacion,
    List<CategoryResponse> categorias
) {

}
