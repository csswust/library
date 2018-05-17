package com.zjl.library.controller;

import com.baidu.ueditor.ActionEnter;
import com.zjl.library.common.config.Config;
import com.zjl.library.common.config.SiteKey;
import com.zjl.library.controller.common.BaseAction;
import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/system")
public class SystemAction extends BaseAction {
    private static Logger log = LoggerFactory.getLogger(SystemAction.class);

    @ResponseBody
    @RequestMapping(value = "/authError", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> authError() throws Exception {
        Map<String, Object> map = new HashMap<>();
        map.put("code", "权限不足");
        return map;
    }


    @RequestMapping(value = "/ueditor", method = {RequestMethod.GET, RequestMethod.POST})
    public String ueditor() {
        String rootPath = Config.get(SiteKey.UPLOAD_UEDITOR_DIR, SiteKey.UPLOAD_UEDITOR_DIR_DE);
        String action = request.getParameter("action");
        // conf.json文件必须放在rootPath/conf/目录下
        String result = new ActionEnter(request, rootPath).exec();
        if (action != null && (action.equals("listfile") || action.equals("listimage"))) {
            rootPath = rootPath.replace("\\", "/");
            result = result.replaceAll(rootPath, "/");
            result = result.replaceAll("D:/", "");
        }
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=UTF-8");
        response.setHeader("cache-control", "no-cache");
        PrintWriter out = null;
        try {
            out = response.getWriter();
            out.write(result);
            out.flush();
        } catch (IOException e) {
            log.error("out.writer data:{} error: {}", result, e);
        } finally {
            if (out != null) {
                out.close();
            }
        }
        return null;
    }

    @ResponseBody
    @RequestMapping(value = "/upload", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, Object> upload(MultipartFile file, HttpServletRequest request) {
        String fileName = file.getOriginalFilename();
        Map<String, Object> map = new HashMap<>();
        String path = SiteKey.UPLOAD_IMAGE_DIR_DE + "/" + fileName;
        map.put("path", fileName);
        System.out.println(path);
        File dest = new File(path);
        if (!dest.getParentFile().exists()) {
            dest.getParentFile().mkdir();
        }
        try {
            file.transferTo(dest);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return map;
    }

    @ResponseBody
    @RequestMapping(value = "/download", method = {RequestMethod.GET, RequestMethod.POST})
    public ResponseEntity<byte[]> download(
            @RequestParam(required = true, defaultValue = "false") boolean isTempPath,
            @RequestParam(required = true, defaultValue = "false") boolean isImagePath,
            @RequestParam(required = true, defaultValue = "false") boolean isUeditorPath,
            @RequestParam(required = false) String path) {
        //下载文件路径
        File file = null;
        if (isTempPath) {
            // 临时路径
            String tempPath = Config.get(SiteKey.UPLOAD_TEMP_DIR, SiteKey.UPLOAD_TEMP_DIR_DE);
            file = new File(tempPath + path);
        } else if (isUeditorPath) {
            // ueditor路径
            String ueditorPath = Config.get(SiteKey.UPLOAD_UEDITOR_DIR, SiteKey.UPLOAD_UEDITOR_DIR_DE);
            int index = path.indexOf("?");
            if (index != -1) path = path.substring(0, index);
            file = new File(ueditorPath + path);
        } else if (isImagePath) {
            // 临时路径
            String imagePath = Config.get(SiteKey.UPLOAD_IMAGE_DIR, SiteKey.UPLOAD_IMAGE_DIR_DE);
            file = new File(imagePath + path);
        } else {
            // 非标准路径
            file = new File(path);
        }
        if (!file.isFile() || !file.exists()) return null;
        HttpHeaders headers = new HttpHeaders();
        //下载显示的文件名，解决中文名称乱码问题
        String downloadFielName = null;
        try {
            downloadFielName = new String(file.getName().getBytes("UTF-8"), "iso-8859-1");
        } catch (UnsupportedEncodingException e) {
            log.error("field.get data:{} error: {}", file.getName(), e);
        }
        //通知浏览器以attachment（下载方式）打开图片
        headers.setContentDispositionFormData("attachment", downloadFielName);
        //application/octet-stream ： 二进制流数据（最常见的文件下载）。
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        try {
            return new ResponseEntity<byte[]>(FileUtils.readFileToByteArray(file),
                    headers, HttpStatus.CREATED);
        } catch (IOException e) {
            log.error("data:{} error: {}", file.getName(), e);
        }
        return null;
    }
}
