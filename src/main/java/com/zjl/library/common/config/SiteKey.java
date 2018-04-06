package com.zjl.library.common.config;

/**
 * Created by 972536780 on 2017/11/20.
 */
public class SiteKey {
    // cache本地缓存获取结果的超时时间，单位ms
    public final static String CACHE_GET_TIMEOUT = "cache_get_timeout";
    public final static int CACHE_GET_TIMEOUT_DE = 10000;

    // 上传临时目录
    public final static String UPLOAD_TEMP_DIR = "upload_temp_dir";
    public final static String UPLOAD_TEMP_DIR_DE = "/root/installtion/library/temp";

    // 	ueditor上传目录
    public final static String UPLOAD_UEDITOR_DIR = "upload_ueditor_dir";
    public final static String UPLOAD_UEDITOR_DIR_DE = "/root/installtion/library/ueditor";

    // 	ueditor上传目录
    public final static String UPLOAD_IMAGE_DIR = "upload_image_dir";
    public final static String UPLOAD_IMAGE_DIR_DE = "/root/installtion/library/image";
}