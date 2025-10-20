package com.appointmenthostpital.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appointmenthostpital.server.converts.MedicineCategoryConvert;
import com.appointmenthostpital.server.dtos.admin.AdminMedicineCategoryDTO;
import com.appointmenthostpital.server.exceptions.NotFoundResourceException;
import com.appointmenthostpital.server.models.MedicineCategoryModel;
import com.appointmenthostpital.server.repositories.MedicineCategoryRepository;
import com.appointmenthostpital.server.responses.MedicineCategoryResponse;

@Service
public class MedicineCategoryService {

    @Autowired
    private MedicineCategoryRepository medicineCategoryRepository;

    public MedicineCategoryModel getCategoryById(Long id) {
        return medicineCategoryRepository.findById(id).orElseThrow(() -> new NotFoundResourceException("Không tìm thấy danh mục thuốc"));
    }

    public List<MedicineCategoryResponse> handleGetMedicineCategoryList() {
        List<MedicineCategoryModel> models = medicineCategoryRepository.findAll();
        return models.stream().map(MedicineCategoryConvert::convertToResponse).toList();
    }

    public MedicineCategoryResponse handleCreateMedicineCategory(AdminMedicineCategoryDTO.CreateCategoryRequest request) {
        MedicineCategoryModel model = MedicineCategoryConvert.convertFromCreateRequest(request);
        model = medicineCategoryRepository.save(model);
        return MedicineCategoryConvert.convertToResponse(model);
    }
}
