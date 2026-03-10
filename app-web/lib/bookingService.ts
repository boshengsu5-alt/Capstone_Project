import { supabase } from '@/lib/supabase';
import type { Database } from '../../database/types/supabase';

// ============================================================
// Booking Service (Web Admin). Web 管理端借用服务
// ============================================================

/** Booking with joined asset and borrower details. 包含资产和借用者详情的借用记录 */
export type BookingWithDetails = Database['public']['Tables']['bookings']['Row'] & {
    assets: Pick<Database['public']['Tables']['assets']['Row'], 'name' | 'qr_code'> | null;
    profiles: Pick<Database['public']['Tables']['profiles']['Row'], 'full_name' | 'student_id'> | null;
};

export const bookingService = {
    /**
     * Fetch all bookings with asset and borrower details.
     * 获取所有借用记录，包含资产和借用者详情
     */
    async getBookings(): Promise<BookingWithDetails[]> {
        const { data, error } = await supabase
            .from('bookings')
            .select(`
                *,
                assets ( name, qr_code ),
                profiles!borrower_id ( full_name, student_id )
            `)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching bookings:', error.message);
            return [];
        }

        return (data as unknown) as BookingWithDetails[];
    },

    /**
     * Approve a booking request.
     * 审批通过借用请求
     */
    async approveBooking(id: string, approverId?: string): Promise<boolean> {
        const payload: Database['public']['Tables']['bookings']['Update'] = {
            status: 'approved',
            approver_id: approverId || null
        };
        const { error } = await (supabase as any)
            .from('bookings')
            .update(payload)
            .eq('id', id);

        if (error) {
            console.error('Error approving booking:', error);
            return false;
        }

        // 插入审批通过通知
        if (approverId) {
            const { data: booking } = await supabase
                .from('bookings')
                .select('borrower_id, assets(name)')
                .eq('id', id)
                .single();

            if (booking) {
                await (supabase as any).from('notifications').insert({
                    user_id: (booking as any).borrower_id,
                    type: 'booking_approved',
                    title: 'Booking Approved',
                    message: `Your booking for ${(booking as any).assets?.name ?? 'an asset'} has been approved.`,
                    metadata: { booking_id: id }
                });
            }
        }

        return true;
    },

    /**
     * Reject a booking request with reason.
     * 拒绝借用请求，需填写原因
     */
    async rejectBooking(id: string, reason: string, approverId?: string): Promise<boolean> {
        const payload: Database['public']['Tables']['bookings']['Update'] = {
            status: 'rejected',
            rejection_reason: reason,
            approver_id: approverId || null
        };
        const { error } = await (supabase as any)
            .from('bookings')
            .update(payload)
            .eq('id', id);

        if (error) {
            console.error('Error rejecting booking:', error);
            return false;
        }

        // 插入审批拒绝通知
        const { data: booking } = await supabase
            .from('bookings')
            .select('borrower_id, assets(name)')
            .eq('id', id)
            .single();

        if (booking) {
            await (supabase as any).from('notifications').insert({
                user_id: (booking as any).borrower_id,
                type: 'booking_rejected',
                title: 'Booking Rejected',
                message: `Your booking has been rejected. Reason: ${reason}`,
                metadata: { booking_id: id }
            });
        }

        return true;
    }
};
