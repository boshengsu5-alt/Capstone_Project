-- ============================================================
-- UniGear: Grant Table Permissions for RLS to Work
-- 校园资产管理系统 — 授予表级别权限（RLS 生效的前提）
-- Migration: 004_grant_table_permissions.sql
-- Date: 2026-03-10 (Day 4)
-- Author: Bosheng
--
-- Problem: Tables created via SQL Editor lack base GRANT permissions.
-- RLS policies only work ON TOP of table-level grants.
-- Without GRANT SELECT, even RLS USING(true) won't allow reads.
--
-- 问题：通过 SQL Editor 创建的表缺少基础 GRANT 权限。
-- RLS 策略建立在表级别权限之上，没有 GRANT SELECT，
-- 即使 RLS 策略写了 USING(true) 也无法读取。
--
-- Rollback: REVOKE ALL ON ALL TABLES IN SCHEMA public FROM authenticated, anon;
-- ============================================================

-- 资产表：所有人可读，认证用户可增删改（RLS 进一步限制为 admin/staff）
GRANT SELECT ON assets TO authenticated, anon;
GRANT INSERT, UPDATE, DELETE ON assets TO authenticated;

-- 分类表：所有人可读，认证用户可增删改（RLS 限制为 admin/staff）
GRANT SELECT ON categories TO authenticated, anon;
GRANT INSERT, UPDATE, DELETE ON categories TO authenticated;

-- 借用表：认证用户可读写（RLS 限制借用者看自己的，管理员看全部）
GRANT SELECT, INSERT, UPDATE ON bookings TO authenticated;

-- 损坏报告：认证用户可读写（RLS 限制报告者看自己的，管理员看全部）
GRANT SELECT, INSERT, UPDATE ON damage_reports TO authenticated;

-- 通知表：认证用户可读写（RLS 限制只看自己的通知）
GRANT SELECT, INSERT, UPDATE ON notifications TO authenticated;

-- 用户资料：认证用户可读可改（RLS 限制只改自己的）
GRANT SELECT, UPDATE ON profiles TO authenticated;

-- 评价表：认证用户可读写（RLS 限制只写自己的评价）
GRANT SELECT, INSERT, UPDATE ON reviews TO authenticated;

-- ============================================================
-- END OF MIGRATION 004
-- ============================================================
