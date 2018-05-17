package com.zjl.library.spring;

import org.springframework.core.convert.converter.Converter;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateConverter implements Converter<String, Date> {
    @Override
    public Date convert(String source) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        dateFormat.setLenient(false);
        try {
            return dateFormat.parse(source);
        } catch (ParseException e) {
            SimpleDateFormat dateFormat01 = new SimpleDateFormat("yyyy-MM-dd");
            dateFormat01.setLenient(false);
            try {
                return dateFormat01.parse(source);
            } catch (ParseException e1) {
               e.printStackTrace();
               return null;
            }
        }
    }
}
